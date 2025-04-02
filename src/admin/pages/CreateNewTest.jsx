import { useState } from "react";
import instance from "../../axiosConfig";

function CreateNewTest() {
  const [test, setTest] = useState({
    name: "",
    questionsFile: "",
  });

  function handleChange(e) {
    if (e.target.name === "questionsFile")
      setTest((prev) => ({ ...prev, questionsFile: e.target.files[0] }));
    else {
      const { name, value } = e.target;
      setTest((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", test.name);
      formData.append("questionsFile", test.questionsFile);
      await instance.post("/admin/test/create", formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of the test"
          name="name"
          value={test.name}
          onChange={handleChange}
        />
        <input
          type="file"
          name="questionsFile"
          accept=".json"
          onChange={handleChange}
        />
        <button type="submit">Create Test</button>
      </form>
    </>
  );
}

export default CreateNewTest;
