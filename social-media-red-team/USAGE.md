# Quick Start Guide

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd social-media-red-team
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure (optional):**
   - Copy `.env.example` to `.env` and fill in API keys if needed
   - Edit `config/config.yaml` to customize settings

## Basic Usage

### Example: Analyze Bilibili Account

If you were attacked by a Bilibili account:

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID
```

### What Happens:

1. **Intelligence Gathering:**
   - Profile information (name, bio, level, etc.)
   - Account statistics (followers, following, etc.)
   - Recent videos and content
   - Activity analysis

2. **Threat Assessment:**
   - Risk scoring (0-100)
   - Threat level determination
   - Indicator identification
   - Pattern analysis

3. **Strategy Generation:**
   - Immediate defensive actions
   - Short-term monitoring
   - Long-term protection
   - Platform-specific recommendations
   - Legal options

4. **Report Generation:**
   - JSON report (machine-readable)
   - Text report (human-readable)
   - HTML report (formatted, shareable)

## Command Line Options

```bash
python main.py --help
```

**Required:**
- `--platform`: Platform to analyze (bilibili, twitter, reddit)
- `--account-id`: Account ID or username

**Optional:**
- `--deep-scan`: More thorough analysis
- `--export-json`: Export JSON report
- `--export-html`: Export HTML report
- `--export-txt`: Export text report
- `--config`: Path to custom config file

## Output Location

Reports are saved to `./reports/` by default.

You can change this in `config/config.yaml`:
```yaml
output:
  directory: "./reports"
```

## Understanding the Results

### Threat Level

- **Low (0-39)**: Minimal threat, continue monitoring
- **Medium (40-69)**: Moderate threat, take defensive actions
- **High (70-100)**: Significant threat, immediate action recommended

### Risk Score Factors

- Account age and activity patterns
- Content analysis
- Behavioral indicators
- Cross-platform consistency (if multiple platforms)

### Recommended Actions

The tool provides defensive strategies based on threat level:

**Immediate:**
- Save evidence
- Block account
- Report to platform

**Short-term:**
- Monitor activity
- Document interactions
- Report escalation

**Long-term:**
- Legal consultation
- Security improvements
- Privacy review

## Legal Reminder

⚠️ **Always use this tool responsibly:**
- Only for defensive purposes
- Comply with platform Terms of Service
- Follow applicable laws
- Respect privacy
- Use intelligence ethically

See `LEGAL.md` for detailed legal guidelines.

## Troubleshooting

### "Platform not supported"
- Check that the platform is enabled in `config/config.yaml`
- Verify platform name spelling (lowercase)

### "Failed to gather intelligence"
- Check internet connection
- Verify account ID/username is correct
- Some platforms may require API authentication
- Rate limiting may be too aggressive

### Import errors
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version (3.7+ required)

## Next Steps

1. Review generated reports in `./reports/`
2. Follow recommended defensive strategies
3. Document evidence for potential legal action
4. Report to platform moderators if needed
5. Consult legal counsel for serious cases

## Support

For issues or questions:
1. Review documentation (README.md, LEGAL.md)
2. Check configuration settings
3. Review platform-specific requirements
4. Consult legal counsel for legal questions

