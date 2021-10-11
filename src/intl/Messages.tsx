export type MessageSegment = string | {[id: string]: MessageSegment};

type Messages = {
  [componentName: string]: {
    [id: string]: MessageSegment;
  };
};

export default Messages;
