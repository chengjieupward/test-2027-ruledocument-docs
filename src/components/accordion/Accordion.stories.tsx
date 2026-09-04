import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionSection } from './Accordion';

const meta = {
  title: 'Data Display/Accordion',
  component: AccordionSection,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AccordionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { title: 'Title', description: 'Description', children: 'Accordion Body' } };
export const DefaultOpen: Story = { args: { title: 'Title', description: 'Description', children: 'Accordion Body', defaultOpen: true } };
export const Stacked: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <AccordionSection title="First item" description="Description">Content 1</AccordionSection>
      <AccordionSection title="Second item" description="Description" defaultOpen>Content 2</AccordionSection>
      <AccordionSection title="Third item" description="Description">Content 3</AccordionSection>
    </div>
  ),
};
