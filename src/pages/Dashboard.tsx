import { useRef, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { extractPdfText } from '../utils/extractPdfText'

const matchingSkills = ['React', 'TypeScript', 'JavaScript', 'REST APIs']
const missingSkills = ['AWS', 'Docker']
const suggestions = [
  'Highlight your React and TypeScript experience.',
  'Add measurable achievements to your work experience.',
  'Mention your API integration experience.',
  'Consider adding Docker experience.',
]

const quickActions = [
  { title: 'Tailor My Resume', detail: 'Align your resume to a role', icon: <DescriptionOutlinedIcon />, tint: '#efefff' },
  { title: 'Practice Interview', detail: 'Build confidence with practice', icon: <ForumOutlinedIcon />, tint: '#e9f7f2' },
  { title: 'Analyze New Job', detail: 'Check your fit for a job', icon: <SearchRoundedIcon />, tint: '#fff4e8' },
]

const cardSx = { height: '100%', borderRadius: 3, bgcolor: 'background.paper' }

function SectionHeading({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <Stack spacing={0.45}>
      {eyebrow && <Typography variant="overline" color="primary.main" sx={{ fontWeight: 750, letterSpacing: '.11em', lineHeight: 1.2 }}>{eyebrow}</Typography>}
      <Typography variant="h6">{title}</Typography>
    </Stack>
  )
}

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleResumeSelect = async (file?: File) => {
    if (!file) return

    setFileName(file.name)
    setResumeText('')
    setUploadError('')

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Please select a PDF file. Other file types are not supported.')
      return
    }

    setIsExtracting(true)
    try {
      const text = await extractPdfText(file)
      if (!text) {
        setUploadError('No readable text was found. This PDF may contain scanned pages.')
        return
      }
      setResumeText(text)
    } catch {
      setUploadError('We couldn’t read this PDF. Please try another file.')
    } finally {
      setIsExtracting(false)
    }
  }

  const handleRemoveResume = () => {
    setFileName('')
    setResumeText('')
    setUploadError('')
    setIsExtracting(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e9ebf3', bgcolor: 'rgba(255,255,255,.92)' }}>
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar disableGutters sx={{ minHeight: 76, justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: 'white', borderRadius: 2.5 }}>
                <AutoAwesomeRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.15, color: 'text.primary' }}>CareerAI</Typography>
                <Typography variant="caption" color="text.secondary">AI Career Assistant</Typography>
              </Box>
            </Stack>
            <Avatar sx={{ width: 38, height: 38, bgcolor: '#e8e9ff', color: 'primary.dark', fontSize: 14, fontWeight: 750 }}>JD</Avatar>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3.5, md: 5 }, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={0.8} sx={{ mb: 3.5 }}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}>Your AI Career Assistant</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 650, lineHeight: 1.7 }}>
            Analyze your resume, improve your applications, and prepare for interviews.
          </Typography>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.65fr) minmax(300px, 1fr)' }, gap: 2.5, alignItems: 'stretch' }}>
          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.25 }, '&:last-child': { pb: { xs: 2.5, sm: 3.25 } } }}>
              <Stack spacing={2.5}>
                <Box>
                  <SectionHeading title="Resume Analyzer" eyebrow="GET ROLE-READY" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>See how your experience matches the role and get clear ways to improve.</Typography>
                </Box>
                {!fileName && (
                  <Paper
                    variant="outlined"
                    onClick={() => inputRef.current?.click()}
                    sx={{ p: 2.5, cursor: 'pointer', textAlign: 'center', borderStyle: 'dashed', borderColor: '#d7d9e7', bgcolor: '#fbfbfe', borderRadius: 2.5, transition: 'all .2s', '&:hover': { borderColor: 'primary.main', bgcolor: '#f8f7ff' } }}
                  >
                    <Avatar sx={{ width: 44, height: 44, mx: 'auto', mb: 1.25, bgcolor: 'primary.light', color: 'primary.main' }}><CloudUploadOutlinedIcon /></Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Upload your resume</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.35 }}>PDF file · processed privately in your browser</Typography>
                    <Button size="small" variant="outlined" sx={{ mt: 1.5, px: 1.75 }} startIcon={<AddRoundedIcon />}>Upload Resume</Button>
                  </Paper>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  hidden
                  onChange={(event) => {
                    void handleResumeSelect(event.target.files?.[0])
                    event.target.value = ''
                  }}
                />
                {fileName && (
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, borderColor: '#e5e6f0', bgcolor: '#fbfbfe' }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ width: 42, height: 42, bgcolor: 'primary.light', color: 'primary.main' }}><DescriptionOutlinedIcon /></Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">Selected Resume</Typography>
                        <Typography variant="body2" fontWeight={700} noWrap title={fileName}>{fileName}</Typography>
                      </Box>
                      {isExtracting && <CircularProgress size={22} aria-label="Extracting resume text" />}
                    </Stack>
                    {isExtracting && <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Extracting text from your resume…</Typography>}
                    {uploadError && <Alert severity="error" sx={{ mt: 1.5 }}>{uploadError}</Alert>}
                    {resumeText && !isExtracting && (
                      <>
                        <Alert severity="success" sx={{ mt: 1.5 }}>Resume successfully analyzed</Alert>
                        <Accordion disableGutters elevation={0} sx={{ mt: 1, bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ px: 0, minHeight: 44, '& .MuiAccordionSummary-content': { my: 1 } }}>
                            <Typography variant="body2" fontWeight={650}>Preview extracted text</Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ px: 0, pt: 0 }}>
                            <Box sx={{ maxHeight: 220, overflow: 'auto', p: 1.5, borderRadius: 2, bgcolor: '#f5f6fa', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{resumeText}</Typography>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    )}
                    <Button
                      size="small"
                      color="inherit"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={handleRemoveResume}
                      disabled={isExtracting}
                      sx={{ mt: 1, color: 'text.secondary' }}
                    >
                      Remove Resume
                    </Button>
                  </Paper>
                )}
                <TextField
                  label="Job description"
                  placeholder="Paste the job description you're targeting..."
                  multiline
                  minRows={3}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, alignItems: 'flex-start' } }}
                />
                <Button fullWidth variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ py: 1.25 }}>
                  Analyze Resume
                </Button>
                <Typography variant="caption" textAlign="center" color="text.secondary" sx={{ mt: '-12px !important' }}>Your resume stays private and secure.</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.25 }, '&:last-child': { pb: { xs: 2.5, sm: 3.25 } } }}>
              <Stack spacing={2.5}>
                <SectionHeading title="Resume Match Overview" eyebrow="YOUR LATEST ANALYSIS" />
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, bgcolor: '#fafaff', borderColor: '#efeff8' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>Match score</Typography>
                    <Typography variant="h5" color="primary.main" fontWeight={800}>78%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 8, bgcolor: '#e9e8fa', '& .MuiLinearProgress-bar': { borderRadius: 8 } }} />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>A strong foundation for this role</Typography>
                </Paper>
                <Box>
                  <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 1.2 }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 17, color: 'success.main' }} />
                    <Typography variant="subtitle2" fontWeight={700}>Matching skills</Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={0.9}>
                    {matchingSkills.map((skill) => <Chip key={skill} label={skill} size="small" sx={{ bgcolor: '#eaf6f1', color: '#287c61', fontWeight: 600, borderRadius: 1.5 }} />)}
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 1.2 }}>
                    <AddRoundedIcon sx={{ fontSize: 17, color: '#d28a35' }} />
                    <Typography variant="subtitle2" fontWeight={700}>Skills to consider</Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={0.9}>
                    {missingSkills.map((skill) => <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ color: '#94652b', borderColor: '#eed8b8', bgcolor: '#fffaf3', fontWeight: 600, borderRadius: 1.5 }} />)}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.25 }, '&:last-child': { pb: { xs: 2.5, sm: 3.25 } } }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <SectionHeading title="AI Suggestions" />
                  <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.light', color: 'primary.main' }}><AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} /></Avatar>
                </Stack>
                <Stack spacing={1.45}>
                  {suggestions.map((suggestion, index) => (
                    <Stack key={suggestion} direction="row" spacing={1.25} alignItems="flex-start">
                      <Box sx={{ mt: 0.25, width: 22, height: 22, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: '50%', bgcolor: '#f0efff', color: 'primary.main', fontSize: 11, fontWeight: 750 }}>{String(index + 1).padStart(2, '0')}</Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>{suggestion}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.25 }, '&:last-child': { pb: { xs: 2.5, sm: 3.25 } } }}>
              <Stack spacing={2}>
                <SectionHeading title="Quick Actions" />
                <Stack spacing={1}>
                  {quickActions.map((action) => (
                    <Button key={action.title} variant="text" color="inherit" fullWidth endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />} sx={{ justifyContent: 'space-between', textAlign: 'left', px: 1, py: 1, borderRadius: 2, '&:hover': { bgcolor: '#f8f8fc' } }}>
                      <Stack direction="row" spacing={1.35} alignItems="center">
                        <Avatar variant="rounded" sx={{ bgcolor: action.tint, color: 'text.primary', width: 40, height: 40 }}>{action.icon}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{action.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{action.detail}</Typography>
                        </Box>
                      </Stack>
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center' }}>CareerAI · Your next opportunity starts here</Typography>
      </Container>
    </Box>
  )
}
