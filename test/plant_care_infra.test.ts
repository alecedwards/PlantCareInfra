import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as PlantCareInfra from '../lib/plant_care_infra-stack';

function synth(): Template {
  const app = new cdk.App();
  const stack = new PlantCareInfra.PlantCareInfraStack(app, 'MyTestStack');
  return Template.fromStack(stack);
}

test('creates a Rust lambda on the provided.al2023 runtime', () => {
  const template = synth();

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'provided.al2023',
    Handler: Match.anyValue(),
  });
});

test('exposes the function through a public Function URL', () => {
  const template = synth();

  template.hasResourceProperties('AWS::Lambda::Url', {
    AuthType: 'NONE',
  });
});
