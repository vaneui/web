'use client'

import React from 'react';
import { Col, Text, Title, PageTitle, Container, Card } from '@vaneui/ui';
import { DocsPageProps } from './types';
import { CodeBlock } from '../components/CodeBlock';

export function DocsPageContent(
  {
    category,
    pageTitle,
    description,
    propCategories,
    examples,
  }: DocsPageProps) {

  return (
    <Container xs className="w-full py-10">
      <Col className="w-full gap-10">
        <Col>
          <Text sm uppercase secondary mono>{category}</Text>
          <PageTitle>{pageTitle}</PageTitle>
          <Text>{description}</Text>
        </Col>

        {/* Examples */}
        {examples.map((example, index) => (
          <Col key={index}>
            <Title>{example.title}</Title>
            <Text>{example.description}</Text>
            <Card sharp itemsCenter className="gap-8">
              {example.component}
              <CodeBlock
                code={example.code}
                language="tsx"
                fileName={`${pageTitle}${example.title ? ' - ' + example.title : ''}.tsx`}
              />
            </Card>
          </Col>
        ))}

        {/* Props Documentation */}
        <Col lg>
          {propCategories.length > 0 && (
            <>
              <Title sm>Props</Title>
              {propCategories.map((category, catIndex) => (
                <Col key={catIndex}>
                  <Text secondary uppercase>{category.title}</Text>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                      <tr>
                        <th scope="col"
                            className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop
                        </th>
                        <th scope="col"
                            className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                        </th>
                        <th scope="col"
                            className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default
                        </th>
                        <th scope="col"
                            className="min-w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">Description
                        </th>
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {category.props.map((prop, propIndex) => (
                        <tr key={propIndex}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {prop.name}
                            {prop.required && <span className="text-red-500 ml-1">*</span>}
                          </td>
                          <td className="px-6 py-4 font-mono whitespace-nowrap text-sm text-gray-500">{prop.type}</td>
                          <td
                            className="px-6 py-4 font-mono whitespace-nowrap text-sm text-gray-500">{prop.defaultValue || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{prop.description}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </Col>
              ))}
            </>
          )}
        </Col>
      </Col>
    </Container>
  );
} 
