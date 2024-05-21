import type * as lib from '../lib';
import { Context } from './types';
export default function createState(ctx: Context): Promise<{
    session: lib.Session | undefined;
}>;
