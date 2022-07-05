import { useQuery } from '@sveltestack/svelte-query';
import db, { UserData } from '../lib/db';

export function useGetUserQuery(openId?: string) {
  console.log('openId', openId)
  return useQuery<UserData>(
    ['user', openId],
    () => db.getUserByOpenid(openId),
    { enabled: !!openId }
  )
}