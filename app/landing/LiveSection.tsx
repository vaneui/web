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
  Divider, Img
} from '@vaneui/ui';
import { CodeBlock } from '../components/CodeBlock';
import { FeatureTitle } from "../components/FeatureTitle";
import { dog } from "./data/dog";

export function LiveSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [renderedStep, setRenderedStep] = useState(0); // What the component shows

  type PropKey = 'CARD_PROPS' | 'IMAGE_PROPS' | 'CHIP_PROPS' | 'ADOPT_BTN_PROPS' | 'ROW_PROPS' | 'LEARN_BTN_PROPS';
  type PropStep = Partial<Record<PropKey, string>>;

  const animationConfig = React.useMemo(() => {
    const steps: PropStep[] = [
      {CHIP_PROPS: '', ADOPT_BTN_PROPS: '', ROW_PROPS: '', CARD_PROPS: '', IMAGE_PROPS: '', LEARN_BTN_PROPS: ''},
      {IMAGE_PROPS: ' sharp'},
      {CARD_PROPS: ' noPadding'},
      {CARD_PROPS: ' noPadding noGap'},
      {CHIP_PROPS: ' bold'},
      {CHIP_PROPS: ' bold primary'},
      {CHIP_PROPS: ' bold primary pill'},
      {ADOPT_BTN_PROPS: ' sm'},
      {LEARN_BTN_PROPS: ' sm'},
      {ADOPT_BTN_PROPS: ' sm success'},
      {ADOPT_BTN_PROPS: ' sm success filled'},
      {ROW_PROPS: ' sm'},
      {ROW_PROPS: ' sm justifyEnd'},
      {ADOPT_BTN_PROPS: ' sm success filled pill'},
      {LEARN_BTN_PROPS: ' sm pill'},
    ]
    return {
      steps: steps,
      template: `<Card row smCol{{CARD_PROPS}} overflowHidden>
  <Img src="/puppy.png" alt="puppy"{{IMAGE_PROPS}} width={185} height={185}
         className="shrink-0 max-sm:w-full"/>
  <Stack sm>
    <Row justifyBetween>
      <Title>{dog.name}</Title>
      <Chip sm{{CHIP_PROPS}}>{dog.gender}</Chip>
    </Row>
    <Divider/>
    <Text sm>{dog.description}</Text>
    <Row smCol{{ROW_PROPS}}>
      <Button{{ADOPT_BTN_PROPS}} className="max-sm:w-full">Adopt</Button>
      <Button{{LEARN_BTN_PROPS}} className="max-sm:w-full">Learn more</Button>
    </Row>
  </Stack>
</Card>`,
    };
  }, []);

  // Compute cumulative props by merging each step with all previous steps
  const propSteps = React.useMemo(() => {
    return animationConfig.steps.reduce((acc: Required<PropStep>[], step, index) => {
      if (index === 0) {
        acc.push(step as Required<PropStep>);
      } else {
        // Merge current step with previous accumulated state
        acc.push({...acc[index - 1], ...step} as Required<PropStep>);
      }
      return acc;
    }, []);
  }, [animationConfig.steps]);

  const propKeys = Object.keys(animationConfig.steps[0]);
  const codeTemplate = animationConfig.template;
  const defaultProps = animationConfig.steps[0]; // First step is the default

  // Calculate what to type for animation
  const textToType = React.useMemo(() => {
    if (currentStep === 0) return '';

    // Find which prop changed in this step
    const stepChanges = animationConfig.steps[currentStep];
    const changedPropKey = Object.keys(stepChanges)[0] as PropKey; // Get the first (and only) changed prop

    if (!changedPropKey) return '';

    const prev = propSteps[currentStep - 1];
    const curr = propSteps[currentStep];

    return curr[changedPropKey].replace(prev[changedPropKey] || '', '').trim();
  }, [currentStep, propSteps, animationConfig.steps]);

  // Typing effect - update component only after completion
  useEffect(() => {
    if (!textToType || currentStep === 0) {
      setTypingText('');
      setIsTyping(false);
      if (currentStep === 0) {
        setRenderedStep(0); // Reset component to initial state
      }
      return;
    }

    // Clear any existing typing text before starting new typing
    setTypingText('');
    setIsTyping(true);
    let charIndex = 0;

    // Start typing immediately without delay to prevent visual reset
    const typeInterval = setInterval(() => {
      if (charIndex <= textToType.length) {
        setTypingText(textToType.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Update the rendered component only after typing is complete
        setRenderedStep(currentStep);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [textToType, currentStep]);

  // Props for code display (shows typing animation)
  const displayProps = React.useMemo(() => {
    if (currentStep === 0) return defaultProps as Required<PropStep>;

    // Always start with the previously rendered step (what was actually completed)
    const baseProps = propSteps[renderedStep] || defaultProps;
    const result = {...baseProps} as Required<PropStep>;

    // Only when actively typing, add the typing animation
    if (isTyping && typingText && currentStep > 0) {
      const stepChanges = animationConfig.steps[currentStep];
      const changedPropKey = Object.keys(stepChanges)[0] as PropKey;

      if (changedPropKey) {
        const currentValue = baseProps[changedPropKey] || '';
        // Always add a space before the typed text (since props are always preceded by a space)
        result[changedPropKey] = currentValue + ' ' + typingText;
      }
    }

    return result;
  }, [currentStep, propSteps, typingText, isTyping, renderedStep, defaultProps, animationConfig.steps]);

  // Props for rendered component (only updates after typing is complete)
  const renderedProps = React.useMemo(() => {
    return propSteps[renderedStep] || defaultProps;
  }, [renderedStep, propSteps, defaultProps]);

  // Helper function to convert space-separated props string to props object
  const parseProps = React.useCallback((propsString: string) => {
    return propsString.trim().split(' ').reduce((acc, prop) => {
      if (prop) acc[prop] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }, []);

  // Dynamic component based on rendered props (only updates after typing completes)
  const DynamicComponent = React.useMemo(() => {
    const cardProps = parseProps(renderedProps['CARD_PROPS'] || '');
    const imgProps = parseProps(renderedProps['IMAGE_PROPS'] || '');
    const chipProps = parseProps(renderedProps['CHIP_PROPS'] || '');
    const adoptProps = parseProps(renderedProps['ADOPT_BTN_PROPS'] || '');
    const learnProps = parseProps(renderedProps['LEARN_BTN_PROPS'] || '');
    const rowProps = parseProps(renderedProps['ROW_PROPS'] || '');

    return (
      <Card row smCol overflowHidden {...cardProps} className="transition-all duration-500">
        <Img tag={Image} src="/puppy.png" alt="puppy" width={185} height={185}
             {...imgProps} className="shrink-0 max-sm:w-full"/>
        <Stack sm>
          <Row justifyBetween>
            <Title>{dog.name}</Title>
            <Chip sm {...chipProps}>{dog.gender}</Chip>
          </Row>
          <Divider/>
          <Text sm>{dog.description}</Text>
          <Row smCol {...rowProps}>
            <Button {...adoptProps} className="max-sm:w-full">Adopt</Button>
            <Button secondary {...learnProps} className="max-sm:w-full">Learn more</Button>
          </Row>
        </Stack>
      </Card>
    );
  }, [renderedProps, parseProps, animationConfig]);

  // Helper function to replace placeholders in template (clean, no HTML)
  const formatCodeTemplate = React.useCallback((template: string, props: Required<PropStep>) => {
    return propKeys.reduce((code, propKey) => {
      const placeholder = `{{${propKey}}}`;
      const value = props[propKey as PropKey] || '';
      return code.replace(placeholder, value);
    }, template);
  }, [propKeys]);

  // Format code for display
  const displayCode = React.useMemo(() => {
    return formatCodeTemplate(codeTemplate, displayProps);
  }, [formatCodeTemplate, codeTemplate, displayProps]);


  // Auto-advance to next step
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % animationConfig.steps.length);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentStep, animationConfig.steps.length]);

  return (
    <Section lg relative>
      <Row absolute
           className="inset-0 bg-[linear-gradient(to_right,var(--color-gray-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-50)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xl>
        <Col xl className="w-full z-10">
          <FeatureTitle
            icon="Eye"
            title="See it in action"
            description="Watch how changing props instantly transforms components."
          />
          <Row xl lgCol relative className="w-full">
            <CodeBlock
              fileName="CardExample.tsx"
              language="tsx"
              code={displayCode}
              className="w-[800px] max-lg:w-full"
            />
            <Col
                 className="max-w-xl absolute max-lg:relative right-0 max-sm:max-w-80 z-20 border-8 rounded-[calc(8px+var(--radius-xl))] border-gray-400/10 backdrop-blur-sm">
              {DynamicComponent}
            </Col>
          </Row>
        </Col>
      </Container>
    </Section>
  );
}