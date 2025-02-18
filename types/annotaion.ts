interface Annotation {
    id: string;
    time: number;
    text: string;
}
interface AnnotationsPanelProps {
    videoId: string;
    initialAnnotations: Annotation[];
}
interface AnnotationState {
    currentAnnotation: string;
    error: string;
    isLoading: boolean;
}

  export type {
    Annotation,
    AnnotationsPanelProps,
    AnnotationState
  }