import { Tabs as Root, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as TabsPrimitive from '@radix-ui/react-tabs'

export const Tabs: {
  Root: typeof TabsPrimitive.Root
  Content: typeof TabsPrimitive.Content
  List: typeof TabsPrimitive.List
  Trigger: typeof TabsPrimitive.Trigger
} = {
  Root,
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
}
