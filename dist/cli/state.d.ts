import type * as lib from '../lib';
import { Context } from './types';
export default function createState(ctx: Context): Promise<{
    integrationKey: string | undefined;
    session: lib.Session | undefined;
    storageApiKey: string | undefined;
}>;
