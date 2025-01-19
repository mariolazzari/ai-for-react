"use client";

import { FormEventHandler, useState } from "react";
import { streamComponent } from "@/app/actions";

function StreamComponent() {
  const [component, setComponent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const comp = await streamComponent();
    setComponent(comp as string);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>Get Component</button>
      </form>
      <div>{component}</div>
    </div>
  );
}

export default StreamComponent;
