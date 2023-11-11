import { ReactNode } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type ScrollbarLayoutProps = {
  children: ReactNode;
  rootClassName: string;
};

const ScrollbarLayout = ({ children, rootClassName }: ScrollbarLayoutProps) => {
  return (
    <ScrollArea.Root className={`${rootClassName} overflow-hidden`}>
      <ScrollArea.Viewport className="w-full h-full pb-2">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="w-2 mr-1 flex touch-none select-none"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="grow relative rounded-md bg-purpleBg opacity-30" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default ScrollbarLayout;
