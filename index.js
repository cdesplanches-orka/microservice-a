const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const GRPC_PORT = process.env.GRPC_PORT || 50051;

// gRPC Setup (Industrial Approach Level 3)
const grpcLib = require('@cdesplanches-orka/grpc-lib');
const packageDefinition = protoLoader.loadSync(grpcLib.protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const serviceProto = grpc.loadPackageDefinition(packageDefinition).service;

function getData(call, callback) {
    callback(null, {
        data: `Data for ID ${call.request.id} from Microservice A`,
        source: 'Microservice A'
    });
}

const grpcServer = new grpc.Server();
grpcServer.addService(serviceProto.DataService.service, { getData });
grpcServer.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC Server running on port ${GRPC_PORT}`);
    grpcServer.start();
});

// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Business endpoint
app.get('/api/a', (req, res) => {
    res.json({ data: 'Hello from microservice A (REST)' });
});

app.listen(PORT, () => {
    console.log(`Service A REST API running on port ${PORT}`);
});
