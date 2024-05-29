"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleChangePassword } from "@/services/auth.service";
import useSWR, { useSWRConfig } from "swr";
import Loading from "@/components/mymap/Loading/Loading";
import { fetcher } from "@/utils/fn";

const Account = () => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = useSWR(`/api/auth/profile`, fetcher);
  if (isLoading) {
    return <Loading />;
  }
  const handleSubmitPassword = async (data) => {
    if (watch("password") !== watch("rePassword")) {
      setError("checkPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }
    if (watch("password") === watch("rePassword")) {
      const res = await handleChangePassword({
        password: data.password,
        repeat_password: data.rePassword,
      });
      console.log(res);
      if (res?.data?.status === 200) {
        mutate("/api/auth/profile");
        toast.success("Change password success!");
        reset();
      }
    }
  };
  return (
    <div>
      <div className="relative px-10 pt-10">
        <h3 className="mb-4 text-2xl font-bold capitalize">Profile</h3>
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardContent className="px-8">
              <form
                onSubmit={handleSubmit(handleSubmitPassword)}
                className="flex items-start gap-10"
              >
                <div className="mt-2 w-[500px] flex flex-col gap-4 pb-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="pass">New Password</Label>
                    <Input
                      id="pass"
                      type="password"
                      {...register("password", {
                        pattern: /^.{8,}$/,
                        required: true,
                      })}
                      size="md"
                      variant="bordered"
                    />
                    <p className="text-[#dc3545]">
                      {errors.password &&
                        "Password must have at least 8 characters"}
                    </p>
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="ConfirmPass">Confirm New Password</Label>
                    <Input
                      id="ConfirmPass"
                      type="password"
                      {...register("rePassword", {
                        pattern: /^.{8,}$/,
                        required: true,
                      })}
                      size="md"
                      variant="bordered"
                    />
                    <p className="text-[#dc3545]">
                      {errors.rePassword &&
                        "Password must have at least 8 characters"}
                    </p>
                    <p className="text-[#dc3545]">
                      {!errors.rePassword &&
                        errors.checkPassword &&
                        errors.checkPassword.message}
                    </p>
                  </div>
                  <button className="btn-primaryy !rounded-lg py-3">
                    Save changes
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
