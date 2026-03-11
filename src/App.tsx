import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

// Overview pages
import GettingStarted from '@/pages/GettingStarted'
import DesignTokens from '@/pages/DesignTokens'
import Typography from '@/pages/Typography'

// Actions
import ButtonDoc from '@/pages/ButtonDoc'
import FABDoc from '@/pages/FABDoc'
import IconButtonDoc from '@/pages/IconButtonDoc'

// Communication
import BadgeDoc from '@/pages/BadgeDoc'
import ProgressDoc from '@/pages/ProgressDoc'
import SnackbarDoc from '@/pages/SnackbarDoc'
import TooltipDoc from '@/pages/TooltipDoc'

// Containment
import CardDoc from '@/pages/CardDoc'
import DialogDoc from '@/pages/DialogDoc'
import BottomSheetDoc from '@/pages/BottomSheetDoc'

// Navigation
import TabsDoc from '@/pages/TabsDoc'
import ChipDoc from '@/pages/ChipDoc'
import NavigationBarDoc from '@/pages/NavigationBarDoc'
import NavigationRailDoc from '@/pages/NavigationRailDoc'
import TopAppBarDoc from '@/pages/TopAppBarDoc'

// Selection
import CheckboxDoc from '@/pages/CheckboxDoc'
import RadioDoc from '@/pages/RadioDoc'
import SwitchDoc from '@/pages/SwitchDoc'
import SliderDoc from '@/pages/SliderDoc'
import DatePickerDoc from '@/pages/DatePickerDoc'

// Text Input
import TextFieldDoc from '@/pages/TextFieldDoc'
import SearchBarDoc from '@/pages/SearchBarDoc'
import AIPromptBoxDoc from '@/pages/AIPromptBoxDoc'
import RichTextEditorDoc from '@/pages/RichTextEditorDoc'

// Lists & Menus
import ListDoc from '@/pages/ListDoc'
import MenuDoc from '@/pages/MenuDoc'
import DividerDoc from '@/pages/DividerDoc'

// Data display
import DataTableDoc from '@/pages/DataTableDoc'
import ContactsTableDoc from '@/pages/ContactsTableDoc'
import StepperDoc from '@/pages/StepperDoc'
import PaginationDoc from '@/pages/PaginationDoc'
import TagDoc from '@/pages/TagDoc'

// Custom
import ButtonColorfulDoc from '@/pages/ButtonColorfulDoc'
import ChatInputDoc from '@/pages/ChatInputDoc'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Overview */}
          <Route path="/" element={<GettingStarted />} />
          <Route path="/tokens" element={<DesignTokens />} />
          <Route path="/typography" element={<Typography />} />

          {/* Actions */}
          <Route path="/components/button" element={<ButtonDoc />} />
          <Route path="/components/fab" element={<FABDoc />} />
          <Route path="/components/icon-button" element={<IconButtonDoc />} />

          {/* Communication */}
          <Route path="/components/badge" element={<BadgeDoc />} />
          <Route path="/components/progress" element={<ProgressDoc />} />
          <Route path="/components/snackbar" element={<SnackbarDoc />} />
          <Route path="/components/tooltip" element={<TooltipDoc />} />

          {/* Containment */}
          <Route path="/components/card" element={<CardDoc />} />
          <Route path="/components/dialog" element={<DialogDoc />} />
          <Route path="/components/bottom-sheet" element={<BottomSheetDoc />} />

          {/* Navigation */}
          <Route path="/components/tabs" element={<TabsDoc />} />
          <Route path="/components/chip" element={<ChipDoc />} />
          <Route path="/components/navigation-bar" element={<NavigationBarDoc />} />
          <Route path="/components/navigation-rail" element={<NavigationRailDoc />} />
          <Route path="/components/top-app-bar" element={<TopAppBarDoc />} />

          {/* Selection */}
          <Route path="/components/checkbox" element={<CheckboxDoc />} />
          <Route path="/components/radio" element={<RadioDoc />} />
          <Route path="/components/switch" element={<SwitchDoc />} />
          <Route path="/components/slider" element={<SliderDoc />} />
          <Route path="/components/date-picker" element={<DatePickerDoc />} />

          {/* Text Input */}
          <Route path="/components/text-field" element={<TextFieldDoc />} />
          <Route path="/components/search" element={<SearchBarDoc />} />
          <Route path="/components/ai-prompt-box" element={<AIPromptBoxDoc />} />
          <Route path="/components/rich-text-editor" element={<RichTextEditorDoc />} />

          {/* Lists & Menus */}
          <Route path="/components/list" element={<ListDoc />} />
          <Route path="/components/menu" element={<MenuDoc />} />
          <Route path="/components/divider" element={<DividerDoc />} />

          {/* Data display */}
          <Route path="/components/data-table" element={<DataTableDoc />} />
          <Route path="/components/contacts-table" element={<ContactsTableDoc />} />
          <Route path="/components/stepper" element={<StepperDoc />} />
          <Route path="/components/pagination" element={<PaginationDoc />} />
          <Route path="/components/tag" element={<TagDoc />} />

          {/* Custom */}
          <Route path="/custom/button-colorful" element={<ButtonColorfulDoc />} />
          <Route path="/custom/chat-input" element={<ChatInputDoc />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
