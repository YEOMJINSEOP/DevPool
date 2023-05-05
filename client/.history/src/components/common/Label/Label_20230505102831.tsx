import styles from './Label.module.css';

type LabelProp = {
  content: string;
}
function Label(props: LabelProp): JSX.Element{

  return(
    <div className={styles.label}>
      {props.content}
    </div>
  )
};

export default Label;