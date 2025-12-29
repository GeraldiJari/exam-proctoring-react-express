export async function uploadExamScreenshot(examId, blob) {
  const formData = new FormData();
  formData.append("screenshot", blob, `screenshot-${Date.now()}.jpg`);

  const res = await fetch(
    `http://localhost:3000/api/exams/${examId}/screenshots`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload screenshot");
  }

  return res.json();
}
