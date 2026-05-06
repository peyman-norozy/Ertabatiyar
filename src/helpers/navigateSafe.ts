import { NavigationProp } from '@/shared/ui/header/model';
import {
  RootDrawerParamList,
  RoutesWithoutParams,
  RoutesWithParams,
} from '@/shared/ui/header/model/types';

export function navigateSafe(
  navigation: NavigationProp,
  route: RoutesWithoutParams,
): void;

export function navigateSafe<T extends RoutesWithParams>(
  navigation: NavigationProp,
  route: T,
  params: RootDrawerParamList[T],
): void;

export function navigateSafe(
  navigation: NavigationProp,
  route: keyof RootDrawerParamList,
  params?: any,
) {
  navigation.navigate(route as any, params);
}
