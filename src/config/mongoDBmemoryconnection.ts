/* eslint-disable no-console */
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: { getUri: () => any; stop: () => any; };

export const dbConnect = async (): Promise<void> => {

    mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" })
};
export const dbDisconnect = async (): Promise<void> => {
    await mongoose.disconnect();
};