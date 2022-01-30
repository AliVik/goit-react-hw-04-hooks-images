import { BallTriangle } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.LoaderBox}>
      <BallTriangle color="#fff" height={100} width={100} />
      <p className={css.LoadingText}>Loading...</p>
    </div>
  );
}
