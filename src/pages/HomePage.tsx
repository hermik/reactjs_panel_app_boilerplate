import { ArrowDown, ArrowUp } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'

const stats = [
    { label: 'Total Revenue', value: '$31,240', delta: '+12.4%', direction: 'up' as const },
    { label: 'Active Users', value: '2,845', delta: '+4.1%', direction: 'up' as const },
    { label: 'Conversion Rate', value: '3.2%', delta: '-0.6%', direction: 'down' as const },
]

const revenueData = [
    { month: 'Jan', current: 4200, previous: 3100 },
    { month: 'Feb', current: 3800, previous: 3400 },
    { month: 'Mar', current: 5100, previous: 3900 },
    { month: 'Apr', current: 4700, previous: 4200 },
    { month: 'May', current: 6300, previous: 4600 },
    { month: 'Jun', current: 7100, previous: 5200 },
]

const revenueChartConfig = {
    current: { label: 'This month', theme: { light: '#2a78d6', dark: '#3987e5' } },
    previous: { label: 'Last month', theme: { light: '#eb6834', dark: '#d95926' } },
} satisfies ChartConfig

const trafficData = [
    { source: 'Direct', visits: 4200 },
    { source: 'Search', visits: 6800 },
    { source: 'Referral', visits: 2100 },
    { source: 'Social', visits: 3400 },
]

const trafficChartConfig = {
    visits: { label: 'Visits', theme: { light: '#2a78d6', dark: '#3987e5' } },
} satisfies ChartConfig

export default function HomePage() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                            <span className="text-2xl font-semibold text-card-foreground">{stat.value}</span>
                            <span
                                className={`flex items-center gap-1 text-sm ${
                                    stat.direction === 'up'
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-600 dark:text-red-400'
                                }`}
                            >
                                {stat.direction === 'up' ? (
                                    <ArrowUp className="size-3.5" />
                                ) : (
                                    <ArrowDown className="size-3.5" />
                                )}
                                {stat.delta} vs last month
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                        <CardDescription>This month compared to last month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={revenueChartConfig} className="aspect-auto h-64 w-full">
                            <AreaChart data={revenueData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                                <CartesianGrid vertical={false} className="stroke-border" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Area
                                    dataKey="previous"
                                    type="monotone"
                                    stroke="var(--color-previous)"
                                    fill="var(--color-previous)"
                                    fillOpacity={0.12}
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Area
                                    dataKey="current"
                                    type="monotone"
                                    stroke="var(--color-current)"
                                    fill="var(--color-current)"
                                    fillOpacity={0.18}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Traffic by source</CardTitle>
                        <CardDescription>Visits in the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={trafficChartConfig} className="aspect-auto h-64 w-full">
                            <BarChart data={trafficData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                                <CartesianGrid vertical={false} className="stroke-border" />
                                <XAxis dataKey="source" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" hideLabel />} />
                                <Bar
                                    dataKey="visits"
                                    fill="var(--color-visits)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={48}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
