import { ErrorMessage } from "formik";

export default function FieldError({ field, ...props }) {
  return (
    <ErrorMessage name={field} {...props}>
      {(msg) => (
        <span
          style={{
            display: "inline-block",
            color: "tomato",
            marginBottom: "0.7rem",
          }}
        >
          {msg}
        </span>
      )}
    </ErrorMessage>
  );
}
