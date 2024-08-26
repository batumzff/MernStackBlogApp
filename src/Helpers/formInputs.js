// import QuillEditor from "../Components/QUILL/QuillEditor";

export const formRegisterInputs = [
    {
      label: "Username",
      name: "username",
      type: "text",
      "data-test": "registerUsername",
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      "data-test": "registerFirstName",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      "data-test": "registerLastName",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      "data-test": "registerEmail",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      "data-test": "registerPassword",
    },
    { label: "Image", name: "image", type: "text", "data-test": "registerImage" },
    { label: "Biography", name: "biography", type:"quill" }
  ];
  
 export const formLoginInputs = [
    {
      label: "Username",
      name: "username",
      type: "text",
      "data-test": "loginUsername",
    },
    { label: "Email", name: "email", type: "email", "data-test": "loginEmail" },
    {
      label: "Password",
      name: "password",
      type: "password",
      "data-test": "loginPassword",
    },
  ];
  