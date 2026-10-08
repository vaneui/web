'use client';

import React from 'react';
import { Grid2, Grid3, Col, Row, Stack, Text, Card, Link } from '@vaneui/ui';
import { AI_CLIENTS, MCP_COMMAND, MCP_URL } from './content';
import { Reveal } from './Reveal';
import { BrandMark, CopyButton, FrameRow, SectionHead } from './frame';

/** Terminal cell with the MCP command, and the supported clients as hairline sub-cells */
export function Agents() {
  return (
    <FrameRow id="ai" label="AI agents">
      <SectionHead index="04" eyebrow="AI agents" title="Ready for AI coding agents">
        The <Link href={MCP_URL} external>@vaneui/mcp</Link> server gives your agent the real component docs and prop
        tables, so it writes valid VaneUI props instead of guessing.
      </SectionHead>

      <Grid2 noGap borderT className="lp-grid max-tablet:grid-cols-1">
        {/* Terminal */}
        <Stack xl flexNoWrap justifyBetween className="lp-cell">
          <Reveal>
            <Col>
              <Text xs fontMono uppercase trackingWider tertiary>Add it with one command</Text>
              <div data-theme="dark">
                <Card sm noPadding noGap overflowHidden>
                  <Row justifyBetween borderB className="px-4 py-2.5">
                    <Row xs aria-hidden="true">
                      <span className="lp-term-dot"/>
                      <span className="lp-term-dot"/>
                      <span className="lp-term-dot"/>
                    </Row>
                    <Text xs fontMono tertiary>zsh</Text>
                    <span aria-hidden="true" className="w-10"/>
                  </Row>
                  <Row justifyBetween itemsStart className="px-4 pt-5 pb-2">
                    <Text sm fontMono className="min-w-0">
                      <Text tag="span" fontMono accent inheritSize>{'$\u00a0'}</Text>{MCP_COMMAND}
                    </Text>
                    <CopyButton value={MCP_COMMAND} label="Copy MCP command"/>
                  </Row>
                  <Col xs className="px-4 pb-5">
                    <Text sm fontMono tertiary># then ask your agent</Text>
                    <Text sm fontMono>
                      <Text tag="span" fontMono accent inheritSize>{'>\u00a0'}</Text>Build a sign-in form with Field and Button
                    </Text>
                  </Col>
                </Card>
              </div>
            </Col>
          </Reveal>
          <Reveal delay={60}>
            <Text sm tertiary>
              Setup for Claude Desktop, Cursor and VS Code is in the <Link href={MCP_URL} external>@vaneui/mcp README</Link>.
            </Text>
          </Reveal>
        </Stack>

        {/* Clients */}
        <Col noGap className="lp-cell">
          <Stack xl flexNoWrap className="pb-6">
            <Reveal delay={80}>
              <Text xs fontMono uppercase trackingWider tertiary>Works with</Text>
            </Reveal>
          </Stack>
          <Grid3 noGap borderT flex1 className="lp-grid max-tablet:grid-cols-3 max-mobile:grid-cols-3">
            {AI_CLIENTS.map((client, i) => (
              <Stack key={client.name} xl flexNoWrap itemsCenter justifyCenter className="lp-cell min-h-40 max-mobile:min-h-0">
                <Reveal delay={120 + i * 50}>
                  <Col sm itemsCenter>
                    <BrandMark path={client.path} size={28}/>
                    <Text sm fontMedium textCenter>{client.name}</Text>
                  </Col>
                </Reveal>
              </Stack>
            ))}
          </Grid3>
          <Stack xl flexNoWrap borderT>
            <Text sm tertiary>Also VS Code and any other client that runs a stdio MCP server.</Text>
          </Stack>
        </Col>
      </Grid2>
    </FrameRow>
  );
}
