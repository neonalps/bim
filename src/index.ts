import fastify from "fastify";
import logger from "@src/log/logger";
import { getApplicationConfig } from "@src/config";
import { RouteManager } from "@src/router/manager";
import { getRouteProviders } from "@src/api/route-providers";
import { DependencyHelper } from "@src/di/helper";

async function start() {
    const applicationConfig = getApplicationConfig();
    const server = fastify();

    DependencyHelper.initDependencies();
    RouteManager.registerRoutes(server, getRouteProviders());

    server.listen({ host: applicationConfig.host, port: applicationConfig.port }, async (err, address) => {
        if (err) {
            logger.error(err);
            process.exit(1);
        }

        logger.info(`🚊 Server listening at ${address}, environment: ${applicationConfig.environment}`);
    });
}

start();