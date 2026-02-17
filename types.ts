export interface ArtifactRequest {
  artifactName: string;
  wordCount: number;
  image: File | null;
}

export interface ArtifactResponse {
  description: string;
}

export interface HistoryFact {
  id: number;
  fact: string;
}
