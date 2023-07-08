import { BusBahnBimClientConfig } from "@src/modules/busbahnbim/client";
import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

const nodeEnv = env.get('NODE_ENV').required().asString();
const serverHost = env.get("HOST").required().asString();
const serverPort = env.get('PORT').required().asPortNumber();

const busBahnBimAuthAid = env.get('BUS_BAHN_BIM_AUTH_AID').required().asString();
const busBahnBimGateUrl = env.get('BUS_BAHN_BIM_GATE_URL').required().asUrlString();

export interface ApplicationConfig {
    environment: string;
    host: string;
    port: number;
}

export function getApplicationConfig(): ApplicationConfig {
    return {
        environment: nodeEnv,
        host: serverHost,
        port: serverPort,
    };
}

export function getBusBahnBimClientConfig(): BusBahnBimClientConfig {
    return {
        gateUrl: busBahnBimGateUrl,
        authAid: busBahnBimAuthAid,
    };
}