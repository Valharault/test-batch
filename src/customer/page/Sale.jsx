import Layout from "../view/Layout";
import {
    Card,
    Text,
    Block,
    Flex,
    ColGrid,
    Metric
} from '@tremor/react';

export default function Sale() {

    const categories = [
        {
            title: 'Sales',
            metric: '$ 23,456,456',
            color: 'indigo',
        },
        {
            title: 'Profit',
            metric: '$ 13,123',
            color: 'fuchsia',
        },
        {
            title: 'Customers',
            metric: '456',
            color: 'amber',
        },
        {
            title: 'Orders',
            metric: '1,234',
            color: 'lime',
        },
    ];

    return (
        <Layout>
            <main>
                <h2 className="text-2xl font-bold py-2 border-b-2 border-gray-200 mb-4 lg:mb-8">
                    <svg className="hi-outline hi-presentation-chart-line inline-block w-6 h-6 opacity-50"
                         stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                    </svg>
                    <span>Mes ventes</span>
                </h2>

                <ColGrid numColsMd={2} numColsLg={4} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
                    {categories.map((item) => (
                        <Card key={item.title} decoration="top" decorationColor={item.color}>
                            <Flex justifyContent="justify-start" spaceX="space-x-4">
                                <Block truncate={true}>
                                    <Text>{item.title}</Text>
                                    <Metric truncate={true}>{item.metric}</Metric>
                                </Block>
                            </Flex>
                        </Card>
                    ))}
                </ColGrid>
            </main>
        </Layout>
    )
}
