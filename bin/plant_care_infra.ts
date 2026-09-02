#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PlantCareInfraStack } from '../lib/plant_care_infra-stack';

const app = new cdk.App();
new PlantCareInfraStack(app, 'PlantCareInfraStack', {
  // Deploy to the account/region implied by the current AWS CLI credentials.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
