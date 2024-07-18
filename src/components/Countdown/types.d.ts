export interface CountdownProps {
  className?: string;
  countdown: number;
  speed: number;
  step?: number;
  preText?: string | React.ReactNode;
  postText?: string | React.ReactNode;
}
