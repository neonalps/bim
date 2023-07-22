import { CorsConfig } from "@src/cors/manager";
import { HttpMethod } from "@src/http/constants";
import { BusBahnBimClientConfig } from "@src/modules/busbahnbim/client";
import { checkValidHttpMethod, getAllowedHttpMethods } from "@src/util/common";
import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

const nodeEnv = env.get('NODE_ENV').required().asString();
const serverHost = env.get("HOST").required().asString();
const serverPort = env.get('PORT').required().asPortNumber();

const busBahnBimAuthAid = env.get('BUS_BAHN_BIM_AUTH_AID').required().asString();
const busBahnBimGateUrl = env.get('BUS_BAHN_BIM_GATE_URL').required().asUrlString();

const corsAllowedMethods = env.get("CORS_ALLOWED_METHODS").required().asString();
const corsAllowedOrigins = env.get("CORS_ALLOWED_ORIGINS").required().asString();

const parseAllowedMethods = (methods: string): HttpMethod[] => {
    const methodStrings = methods.split(",");

    if (!methodStrings.every(method => checkValidHttpMethod(method))) {
        throw new Error(`Illegal value in allowed CORS methods detected. All values must be one of: ${getAllowedHttpMethods().join(", ")}`);
    }

    return methodStrings as HttpMethod[];
};

const corsConfig: CorsConfig = {
    allowedOrigins: corsAllowedOrigins.split(","),
    allowedMethods: parseAllowedMethods(corsAllowedMethods),
}

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

export function getCorsConfig(): CorsConfig {
    return corsConfig;
}