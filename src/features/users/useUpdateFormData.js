export const useUpdateFormData = (
  _id,
  firstName,
  lastName,
  email,
  employeeId,
  designation,
  teamLead,
  personalEmail,
  reportingManager,
  file,
  address,
  gender,
  bloodGroup,
  phone,
  dob,
  doj,
  emergencyPhone,
  PerAddress,
  TempAddress
) => {
  const formData = new FormData();
  formData.append("_id", _id);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("employeeId", employeeId);
  formData.append("designation", designation);
  formData.append("teamLead", teamLead);
  formData.append("reportingManager", reportingManager);
  formData.append("file", file);
  formData.append("address", address);
  formData.append("gender", gender);
  formData.append("bloodGroup", bloodGroup);
  formData.append("phone", phone);
  formData.append("dob", dob);
  formData.append("doj", doj);
  formData.append("personalEmail", personalEmail);
  formData.append("TempAddress", TempAddress);
  formData.append("PerAddress", PerAddress);
  formData.append("emergencyPhone", emergencyPhone);

  return formData;
};
