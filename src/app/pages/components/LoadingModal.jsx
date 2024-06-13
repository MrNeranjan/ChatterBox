"use client";

import React, { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

function LoadingModal() {
  return (
    <Transition show as={Fragment}>
      <Dialog
        as="div"
        style={{ position: "relative", zIndex: 50 }}
        onClose={()=>{}}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
        </TransitionChild>

        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
          <ClipLoader size={50} color="white" />
        </div>
      </Dialog>
    </Transition>
  );
}

export default LoadingModal;
