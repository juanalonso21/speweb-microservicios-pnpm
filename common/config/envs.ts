import * as joi from 'joi';
import 'dotenv/config';
interface EnvVars {
  PORT: number;
  DATABOSE_URL: string;
}
const envEschema = joi.object<EnvVars>({
  PORT: joi.number().default(3000),
  DATABOSE_URL: joi.string().required(),
});
const { error, value: envVars } = envEschema
  .prefs({ errors: { label: 'key' } })
    .validate(process.env); 
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABOSE_URL,
};