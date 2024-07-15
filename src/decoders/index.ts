import { TextDecoder } from "../common/types";
import { base64Decoder } from "./base64";
import { timestamp } from "./timestamp";

export const textDecoders:TextDecoder[] = [
    base64Decoder,
    timestamp,
];
