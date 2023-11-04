import { MdOutlinePhoneEnabled } from "react-icons/md";

export const formInputs = (values) => {
  return [
    {
      label: "First Name",
      name: "firstname",
      rules: "First name is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.firstname,
    },
    {
      label: "Last Name",
      name: "lastname",
      rules: "Last name is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.lastname,
    },
    {
      label: "Username",
      name: "username",
      rules: "Username is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.username,
    },
  ];
};

export const formInputsTwo = (values, isEditing: boolean) => {
  if (isEditing) {
    return [
      {
        label: "User role",
        name: "role",
        rules: "Role is requires",
        icon: MdOutlinePhoneEnabled,
        isSelect: true,
      },
    ];
  }
  return [
    {
      label: "User role",
      name: "role",
      rules: "Role is requires",
      icon: MdOutlinePhoneEnabled,
      isSelect: true,
    },
    {
      label: "Email",
      name: "email",
      rules: "Email is required",
      icon: MdOutlinePhoneEnabled,
      value: values?.email,
      isSelect: false,
    },
  ];
};
