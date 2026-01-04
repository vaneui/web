'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Text,
  Container,
  Col,
  Row,
  Card,
  Title,
  Chip,
  Section,
  Button,
  Stack,
  Divider, 
  Img
} from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { FeatureTitle } from "../components/FeatureTitle";
import { dog } from "./data/dog";
import { AnimationStep } from './utils/typingTypes';
import { getTypingInfo, getCurrentWordInfo, getDisplayCode, getCurrentCodeLines } from './utils/typingLogic';

const BASE_CODE_LINES = [
  '<Card row mobileCol overflowHidden>',
  '  <Img src="/puppy.png" alt="puppy" width={185} height={185}',
  '       className="shrink-0 max-mobile:w-full"/>',
  '  <Stack sm>',
  '    <Row justifyBetween>',
  '      <Title>{dog.name}</Title>',
  '      <Chip sm>{dog.gender}</Chip>',
  '    </Row>',
  '    <Divider/>',
  '    <Text sm>{dog.description}</Text>',
  '    <Row mobileCol>',
  '      <Button className="max-mobile:w-full">Adopt</Button>',
  '      <Button className="max-mobile:w-full">Learn more</Button>',
  '    </Row>',
  '  </Stack>',
  '</Card>'
];

const ANIMATION_STEPS: AnimationStep[] = [
  { lineIndex: 1, text: '  <Img src="/puppy.png" alt="puppy" sharp width={185} height={185}' },
  { lineIndex: 0, text: '<Card row mobileCol noPadding overflowHidden>' },
  { lineIndex: 0, text: '<Card row mobileCol noPadding noGap overflowHidden>' },
  { lineIndex: 6, text: '      <Chip sm bold>{dog.gender}</Chip>' },
  { lineIndex: 6, text: '      <Chip sm bold primary>{dog.gender}</Chip>' },
  { lineIndex: 6, text: '      <Chip sm bold primary pill>{dog.gender}</Chip>' },
  { lineIndex: 11, text: '      <Button sm className="max-mobile:w-full">Adopt</Button>' },
  { lineIndex: 12, text: '      <Button sm className="max-mobile:w-full">Learn more</Button>' },
  { lineIndex: 11, text: '      <Button sm success className="max-mobile:w-full">Adopt</Button>' },
  { lineIndex: 11, text: '      <Button sm success filled className="max-mobile:w-full">Adopt</Button>' },
  { lineIndex: 10, text: '    <Row mobileCol sm>' },
  { lineIndex: 10, text: '    <Row mobileCol sm justifyEnd>' },
  { lineIndex: 11, text: '      <Button sm success filled pill className="max-mobile:w-full">Adopt</Button>' },
  { lineIndex: 12, text: '      <Button sm pill className="max-mobile:w-full">Learn more</Button>' },
];

export function LiveSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typingProgress, setTypingProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingCompletedForStep, setTypingCompletedForStep] = useState(0);
  const [componentProps, setComponentProps] = useState({
    card: {} as Record<string, boolean>,
    img: {} as Record<string, boolean>,
    chip: {} as Record<string, boolean>,
    adoptButton: {} as Record<string, boolean>,
    learnButton: {} as Record<string, boolean>,
    row: {} as Record<string, boolean>
  });
  useEffect(() => {
    if (isTyping && currentStep > 0 && currentStep <= ANIMATION_STEPS.length) {
      const step = ANIMATION_STEPS[currentStep - 1];
      const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
      const currentWordInfo = getCurrentWordInfo(typingInfo, typingProgress);
      
      if (currentWordInfo?.isComplete) {
        const word = currentWordInfo.word.trim();
        if (!word) return;
        
        setComponentProps(prev => {
          const newProps = { ...prev };
          
          switch (step.lineIndex) {
            case 0:
              newProps.card[word] = true;
              break;
            case 1:
              newProps.img[word] = true;
              break;
            case 6:
              newProps.chip[word] = true;
              break;
            case 10:
              newProps.row[word] = true;
              break;
            case 11:
              newProps.adoptButton[word] = true;
              break;
            case 12:
              newProps.learnButton[word] = true;
              break;
          }
          
          return newProps;
        });
      }
    }
  }, [isTyping, currentStep, typingProgress]);
  useEffect(() => {
    if (currentStep === 0 || currentStep > ANIMATION_STEPS.length) {
      setTypingProgress(0);
      setIsTyping(false);
      return;
    }

    const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
    if (!typingInfo.insertText) {
      setTypingProgress(0);
      setIsTyping(false);
      return;
    }
    setTypingProgress(0);
    setIsTyping(true);
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= typingInfo.insertText.length) {
        setTypingProgress(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingCompletedForStep(currentStep);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [currentStep]);

  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev >= ANIMATION_STEPS.length) {
            setComponentProps({
              card: {},
              img: {},
              chip: {},
              adoptButton: {},
              learnButton: {},
              row: {}
            });
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const typingInfo = getTypingInfo(BASE_CODE_LINES, ANIMATION_STEPS, currentStep);
  const currentWordInfo = getCurrentWordInfo(typingInfo, typingProgress);
  const highlightRanges = React.useMemo(() => {
    if (!isTyping || !currentWordInfo || currentWordInfo.wordProgress <= 0) return [];
    
    const previousLines = getCurrentCodeLines(BASE_CODE_LINES, ANIMATION_STEPS, currentStep - 1);
    let lineStartPos = 0;
    for (let i = 0; i < typingInfo.lineIndex; i++) {
      lineStartPos += previousLines[i].length + 1;
    }
    
    const wordStart = lineStartPos + typingInfo.insertPosition + currentWordInfo.wordStart;
    const wordEnd = wordStart + currentWordInfo.wordProgress;
    
    return [{ start: wordStart, end: wordEnd }];
  }, [isTyping, currentWordInfo, typingInfo, currentStep]);
  
  const displayCode = getDisplayCode(BASE_CODE_LINES, ANIMATION_STEPS, currentStep, isTyping, typingProgress, typingCompletedForStep >= currentStep);

  return (
    <Section xl relative>
      <Row absolute
           className="inset-0 bg-[linear-gradient(to_right,var(--color-gray-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-50)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xl>
        <Col xl className="w-full z-10">
          <FeatureTitle
            icon="Eye"
            title="See it in action"
            description="Watch how changing props instantly transforms components."
          />
          <Row xl tabletCol relative className="w-full">
            <CodeBlock
              fileName="CardExample.tsx"
              language="tsx"
              code={displayCode}
              highlightRanges={highlightRanges}
              cursorPosition={isTyping && highlightRanges[0] ? highlightRanges[0].end - 1 : undefined}
              className="w-[800px] max-lg:w-full"
            />
            <Col
                 className="[--b:8px] max-w-xl max-sm:max-w-80 z-20 border-(length:--b) [--br-unit:5] rounded-[calc(var(--b)+var(--br))] shadow-2xl absolute max-lg:relative right-0 border-gray-400/10 backdrop-blur-sm">
              <Card row mobileCol overflowHidden {...componentProps.card} className="transition-all duration-500">
                <Img tag={Image} src="/puppy.png" alt="puppy" width={200} height={200}
                     {...componentProps.img} className="shrink-0 max-sm:w-full"/>
                <Stack sm>
                  <Row justifyBetween>
                    <Title>{dog.name}</Title>
                    <Chip sm {...componentProps.chip}>{dog.gender}</Chip>
                  </Row>
                  <Divider/>
                  <Text sm>{dog.description}</Text>
                  <Row mobileCol {...componentProps.row}>
                    <Button {...componentProps.adoptButton} className="max-sm:w-full">Adopt</Button>
                    <Button secondary {...componentProps.learnButton} className="max-sm:w-full">Learn more</Button>
                  </Row>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}