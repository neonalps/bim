import dependencyManager from "./manager";
import { Dependencies } from "./dependencies";
import { HttpClient } from "@src/modules/http/client";
import { TimeSource } from "@src/util/time";
import { BusBahnBimService } from "@src/modules/busbahnbim/service";
import { BusBahnBimClient } from "@src/modules/busbahnbim/client";
import { getBusBahnBimClientConfig } from "@src/config";

export class DependencyHelper {

    private constructor() {}

    public static initDependencies(): void {
        dependencyManager.registerAll(this.getDependencies());
    }

    private static getDependencies(): Map<Dependencies, any> {

        const httpClient = new HttpClient();
        const timeSource = new TimeSource();

        const busBahnBimClient = new BusBahnBimClient(getBusBahnBimClientConfig(), httpClient, timeSource);
        const busBahnBimService = new BusBahnBimService(busBahnBimClient);

        const dependencies: Map<Dependencies, any> = new Map();
        
        dependencies.set(Dependencies.BusBahnBimService, busBahnBimService);
        dependencies.set(Dependencies.HttpClient, httpClient);
        dependencies.set(Dependencies.TimeSource, timeSource);

        return dependencies;
    }

}