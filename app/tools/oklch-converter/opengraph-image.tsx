import { OG_SIZE } from '../../components/og';
import { toolOgImage } from '../toolPage';

export const alt = 'VaneUI OKLCH converter';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return toolOgImage('oklch-converter');
}
