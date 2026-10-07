'use client';

import { Grid6, Row, Text } from '@vaneui/ui';
import { FRAMEWORKS } from './content';
import { BrandMark, FrameRow } from './frame';

/** One row of equal hairline cells: the label, then each framework */
export function WorksWith() {
  return (
    <FrameRow label="Works with">
      <Grid6 noGap className="lp-grid max-tablet:grid-cols-3 max-mobile:grid-cols-2">
        <Row className="lp-cell h-16 px-8 max-desktop:px-5 max-mobile:px-4">
          <span aria-hidden="true" className="lp-sq"/>
          <Text xs fontMono uppercase trackingWidest tertiary whitespaceNowrap>Works with</Text>
        </Row>
        {FRAMEWORKS.map(f => (
          <Row key={f.name} sm justifyCenter className="lp-cell h-16 px-3">
            <BrandMark path={f.path}/>
            <Text sm fontMedium whitespaceNowrap>{f.name}</Text>
          </Row>
        ))}
      </Grid6>
    </FrameRow>
  );
}
