import { Formik } from "formik";

const AppForm = ({
  children,
  initialValues,
  validationSchema,
  handleSubmit,
  enableReinitialize = false,
  ...rest
} = {}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit({ formValues: values });
      }}
      enableReinitialize={enableReinitialize}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} {...rest}>
          {children}
        </form>
      )}
    </Formik>
  );
};

export default AppForm;
