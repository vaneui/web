import { OG_SIZE } from '../../components/og';
import { toolOgImage } from '../toolPage';

export const alt = 'VaneUI contrast checker';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return toolOgImage('contrast-checker');
}
