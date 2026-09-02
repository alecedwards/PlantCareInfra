import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { RustFunction } from 'cargo-lambda-cdk';

/**
 * Location of the PlantCare Rust project relative to this infra package.
 * The two repositories are expected to be checked out side by side:
 *
 *   PlantCareTracking/
 *     PlantCare/        <- the Rust lambda
 *     PlantCareInfra/   <- this CDK app
 *
 * Override with the `PLANT_CARE_MANIFEST_PATH` env var (path to Cargo.toml) if
 * your layout differs.
 */

export class PlantCareInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logGroup = new logs.LogGroup(this, 'PlantCareFunctionLogs', {
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // The Rust lambda from the PlantCare repository. `cargo-lambda-cdk` runs
    // `cargo lambda build --release` during synth and ships the resulting
    // `bootstrap` binary as the function code.
    const fn = new RustFunction(this, 'PlantCareFunction', {
      manifestPath: 'Cargo.toml',
      gitRemote: 'https://github.com/alecedwards/PlantCare',
      runtime: 'provided.al2023',
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      logGroup,
      environment: {
        RUST_LOG: 'info',
      },
    });

    // The handler is built with `lambda_http`, so a Lambda Function URL gives us
    // a directly reachable HTTPS endpoint without an API Gateway in front.
    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: fnUrl.url,
      description: 'HTTPS endpoint for the PlantCare lambda',
    });

    new cdk.CfnOutput(this, 'FunctionName', {
      value: fn.functionName,
    });
  }
}
23.83
5 + 10 + 14 + 16 + 22 + 76
5 + 10 + 14 + 16 + 22 + 76 + 20
23.28