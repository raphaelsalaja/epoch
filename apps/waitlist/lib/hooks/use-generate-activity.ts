import { useMutation } from "@tanstack/react-query";

export interface GenerateActivityRequest {
  activity: string;
}

export interface GenerateActivityResponse {
  summary: string;
}

async function generateActivity(
  data: GenerateActivityRequest,
): Promise<GenerateActivityResponse> {
  return { summary: data.activity };
}

export function useGenerateActivity() {
  return useMutation<GenerateActivityResponse, Error, GenerateActivityRequest>({
    mutationFn: generateActivity,
    onSuccess: (data) => {
      console.log("📝 User activity saved:", data.summary);
    },
    onError: (error) => {
      console.error("❌ Error saving activity:", error);
    },
  });
}
