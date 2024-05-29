"use client";
import { FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { edges, node_1, node_2, node_3 } from "@/utils/mapUtil";
import { userSlice } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
const { updateLoading } = userSlice.actions;
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonCreatMap from "./ButtonCreatMap";
import { handleCreateMap } from "@/services/map.service";
import { useRouter } from "next/navigation";
const CreateDefault = ({ user_id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const createMindmap1 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~1`,
      user_id: user_id,
      nodes: node_1,
      edges: edges,
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));

      const res = await handleCreateMap(payload);
      console.log(res);
      if (res?.data?.status === 200) {
        router.push(`/mind-maps/${idMap}.~1`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap2 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~2`,
      user_id: user_id,
      nodes: node_2,
      edges: edges,
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/mind-maps/${idMap}.~2`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap3 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~3`,
      user_id: user_id,
      nodes: node_3,
      edges: [],
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/mind-maps/${idMap}.~3`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap4 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~4`,
      user_id: user_id,
      nodes: node_3,
      edges: [],
      edge_type: "straight",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/mind-maps/${idMap}.~4`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="px-8 mt-4 mb-6 flex gap-1 justify-center  items-center btn-primary py-2 !rounded-xl"
            // onClick={onOpen}
          >
            <FiPlus fontSize={"3rem"} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Choose Type Maps</DialogTitle>
          </DialogHeader>
          <div className="flex items-center ">
            <div className="flex flex-1 gap-4">
              <ButtonCreatMap
                src={
                  "https://res.cloudinary.com/dtht61558/image/upload/v1715068232/chart-map_uyw3tw.svg"
                }
                name="Org chart"
                onClick={createMindmap1}
              />
              <ButtonCreatMap
                src={
                  "https://res.cloudinary.com/dtht61558/image/upload/v1715068254/project-retrospective_wewkho.svg"
                }
                name="Retrospective"
                onClick={createMindmap2}
              />
              <ButtonCreatMap
                src={
                  "https://res.cloudinary.com/dtht61558/image/upload/v1715068310/project-plan_nadx6x.svg"
                }
                name="mindmap"
                onClick={createMindmap3}
              />
              <ButtonCreatMap
                src={
                  "https://res.cloudinary.com/dtht61558/image/upload/v1715068323/smart-goals_b0mwt5.svg"
                }
                name="Retrospective"
                onClick={createMindmap4}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDefault;
