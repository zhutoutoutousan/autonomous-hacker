# Usage Examples

## Basic Usage

### Analyze a Bilibili Account

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID
```

This will:
- Gather profile information
- Analyze account statistics
- Collect video information
- Generate threat assessment
- Create defensive strategy
- Output JSON and text reports

### Analyze with Multiple Export Formats

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID --export-json --export-html --export-txt
```

### Analyze a Reddit Account

```bash
python main.py --platform reddit --account-id username
```

### Deep Scan Mode

```bash
python main.py --platform bilibili --account-id ACCOUNT_ID --deep-scan
```

## Output

Reports are saved to the `./reports/` directory by default (configurable in `config/config.yaml`).

### Report Formats

1. **JSON Report** (`intelligence_report_YYYYMMDD_HHMMSS.json`)
   - Machine-readable format
   - Complete data structure
   - Suitable for further processing

2. **HTML Report** (`intelligence_report_YYYYMMDD_HHMMSS.html`)
   - Human-readable format
   - Formatted with styling
   - Easy to share and view

3. **Text Report** (`intelligence_report_YYYYMMDD_HHMMSS.txt`)
   - Plain text format
   - Terminal-friendly
   - Easy to read in any text editor

## Report Contents

Each report includes:

1. **Profile Analysis**
   - Account information
   - Statistics (followers, activity, etc.)
   - Content analysis
   - Activity patterns

2. **Threat Assessment**
   - Risk score (0-100)
   - Threat level (Low/Medium/High)
   - Threat indicators
   - Recommendations

3. **Defensive Strategy**
   - Immediate actions
   - Short-term actions
   - Long-term actions
   - Platform-specific strategies
   - Legal options

4. **Cross-Platform Correlation** (if multiple platforms analyzed)
   - Profile consistency
   - Activity patterns
   - Aggregated threat level

## Example Output

```
================================================================================
INTELLIGENCE SUMMARY
================================================================================

Threat Level: Medium
Risk Score: 45/100

Profiles Analyzed: 1
  - BILIBILI: ACCOUNT_ID

Immediate Actions Recommended:
  • Save all evidence (screenshots, URLs, timestamps)
  • Document the incident with dates and details
  • Block the account on the platform

================================================================================
Full reports saved to: ./reports
================================================================================
```

## Advanced Configuration

Edit `config/config.yaml` to customize:
- Rate limiting per platform
- Output directory
- Default export formats
- Platform-specific settings
- Intelligence gathering depth

## Integration

The tool can be integrated into other scripts:

```python
from main import SocialMediaRedTeam

# Initialize
tool = SocialMediaRedTeam()

# Gather intelligence
profile = tool.gather_intelligence('bilibili', 'ACCOUNT_ID')

# Generate report
report = tool.generate_report(export_formats=['json', 'html'])
```

## Notes

- Rate limiting is enforced to respect platform resources
- Some platforms may require API authentication for full functionality
- Always review and comply with platform Terms of Service
- Use responsibly and legally

