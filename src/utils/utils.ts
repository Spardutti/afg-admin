import { Audio, Genre } from "interfaces/interfaces";

export const isAudio = (audio: Audio | Genre): audio is Audio => (audio as Audio).duration !== undefined;
