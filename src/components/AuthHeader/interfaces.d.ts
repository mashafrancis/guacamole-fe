export interface AuthHeaderProps {
  forwardButtonName: string;
  backwardButtonName: string;
  forwardAction: (event: Event) => void;
  backwardAction: (event: Event) => void;
}
