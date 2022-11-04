import Layout from "../view/Layout";
import {
    Card,
    Title,
    Text,
    Tab,
    TabList,
    Block,
    LineChart,
    ColGrid,
    Metric,
    Icon
} from '@tremor/react';
import {startOfYear, subDays} from 'date-fns';
import {useState} from 'react';
import { PushNotifications } from '@capacitor/push-notifications';

export default function Dashboard() {

    const addListeners = async () => {
        await PushNotifications.addListener('registration', token => {
            console.info('Registration token: ', token.value);
        });

        await PushNotifications.addListener('registrationError', err => {
            console.error('Registration error: ', err.error);
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push notification received: ', notification);
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push notification action performed', notification.actionId, notification.inputValue);
        });
    }

    const registerNotifications = async () => {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            throw new Error('User denied permissions!');
        }

        await PushNotifications.register();
        const Batch = window.batch;
        batch.setConfig({"iOSAPIKey":"DEV631067543800C22C6982849DF8C"});
        Batch.start();

    }

    const getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
        console.log('delivered notifications', notificationList);
    }

    const data = [
        {
            Date: '04.05.2021',
            Price: 113.05,
            Volume: 21400410,
        },
        {
            Date: '05.05.2021',
            Price: 113,
            Volume: 29707270,
        },
        {
            Date: '17.11.2022',
            Price: 95.32,
            Volume: 45187420,
        },
    ];

    const categories = [
        {
            title: 'Sales',
            metric: '$ 12,699',
            metricPrev: '$ 9,456',
            icon: '',
        },
        {
            title: 'Orders',
            metric: '$ 12,699',
            metricPrev: '$ 9,456',
            icon: '',
        },
        {
            title: 'Profit',
            metric: '$ 45,564',
            metricPrev: '$ 9,456',
            icon: '',
        },
        {
            title: 'Customers',
            metric: '1,072',
            metricPrev: '856',
            icon: '',
        },
    ];

    const [selectedPeriod, setSelectedPeriod] = useState('Max');

    const getDate = (dateString) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day);
    };

    const filterData = (startDate, endDate) => data.filter((item) => {
        const currentDate = getDate(item.Date);
        return (currentDate >= startDate) && (currentDate <= endDate);
    });

    const getFilteredData = (period) => {
        const lastAvailableDate = getDate(data[data.length - 1].Date);
        switch (period) {
            case '1M': {
                const periodStartDate = subDays(lastAvailableDate, 30);
                return filterData(periodStartDate, lastAvailableDate);
            }
            case '2M': {
                const periodStartDate = subDays(lastAvailableDate, 60);
                return filterData(periodStartDate, lastAvailableDate);
            }
            case '6M': {
                const periodStartDate = subDays(lastAvailableDate, 180);
                return filterData(periodStartDate, lastAvailableDate);
            }
            case 'YTD': {
                const periodStartDate = startOfYear(lastAvailableDate);
                return filterData(periodStartDate, lastAvailableDate);
            }
            default:
                return data;
        }
    };

    const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}%`;
    return (
        <Layout>
            <main>
                <Title>Dashboard</Title>

                <button onClick={registerNotifications}>Activer les notifs</button>

                <ColGrid numColsSm={2} numColsLg={4} gapX="gap-x-6" gapY="gap-y-6">
                    {categories.map((item) => (
                        <Card key={item.title}>
                            <Block textAlignment="text-center">
                                <Metric marginTop="mt-2">{item.metric}</Metric>
                                <Text textAlignment="text-center">{item.title}</Text>
                            </Block>
                        </Card>
                    ))}
                </ColGrid>
                <Block marginTop="mt-6">
                    <Card>
                        <Title>Share Price</Title>
                        <Text>Daily share price of a fictive company</Text>
                        <TabList
                            defaultValue={selectedPeriod}
                            handleSelect={(value) => setSelectedPeriod(value)}
                            marginTop="mt-10"
                        >
                            <Tab value="1M" text="1M"/>
                            <Tab value="2M" text="2M"/>
                            <Tab value="6M" text="6M"/>
                            <Tab value="YTD" text="YTD"/>
                            <Tab value="Max" text="Max"/>
                        </TabList>
                        <LineChart
                            data={getFilteredData(selectedPeriod)}
                            dataKey="Date"
                            categories={['Price']}
                            colors={['blue']}
                            valueFormatter={dataFormatter}
                            showLegend={false}
                            yAxisWidth="w-12"
                            height="h-80"
                            marginTop="mt-8"
                        />
                    </Card>
                </Block>
            </main>
        </Layout>
    )
}
