import * as ts from "typescript";

export function addRegions(nodes: ts.Node[], text: string)
{
	const region = `#region ${text} (${nodes.length})`;
	const endregion = `#endregion`;
	const newLinePlaceholder = "newline";
	const cleanPlaceholder = "clean";

	if (nodes.length > 0)
	{
		// add regions
		nodes[0] = ts.addSyntheticLeadingComment(nodes[0], ts.SyntaxKind.SingleLineCommentTrivia, newLinePlaceholder, false);
		nodes[0] = ts.addSyntheticLeadingComment(nodes[0], ts.SyntaxKind.SingleLineCommentTrivia, region, false);
		nodes[0] = ts.addSyntheticLeadingComment(nodes[0], ts.SyntaxKind.SingleLineCommentTrivia, newLinePlaceholder, false);
		nodes[nodes.length - 1] = ts.addSyntheticTrailingComment(nodes[nodes.length - 1], ts.SyntaxKind.SingleLineCommentTrivia, cleanPlaceholder, true);
		nodes[nodes.length - 1] = ts.addSyntheticTrailingComment(nodes[nodes.length - 1], ts.SyntaxKind.SingleLineCommentTrivia, newLinePlaceholder, true);
		nodes[nodes.length - 1] = ts.addSyntheticTrailingComment(nodes[nodes.length - 1], ts.SyntaxKind.SingleLineCommentTrivia, endregion, true);
	}
}

export function removeRegions(sourceCode: string)
{
	const newLine = "\r\n";
	const emptyLine = "";
	let regionRegex = "#region";
	let endregionRegex = "#endregion";
	let accessModifierRegex = "(Public|Protected|Private)";
	let writeModifierRegex = "(Readonly|Static)";
	let staticModifierRegex = "(Static)";
	let abstractModifierRegex = "(Abstract)";
	let propertiesRegex = "(Properties)";
	let indexesRegex = "(Indexes)";
	let accessorsRegex = "(Accessors)";
	let constructorRegex = "(Constructors)";
	let methodsRegex = "(Methods)";
	let typesRegex = "(Type aliases)";
	let interfacesRegex = "(Interfaces)";
	let classesRegex = "(Classes)";
	let enumsRegex = "(Enums)";
	let functionsRegex = "(Functions)";
	let variablesRegex = "(Variables)";
	let countRegex = "\\([0-9]+\\)";
	let spaceRegex = "\\s*";
	let propertiesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${accessModifierRegex}${spaceRegex}(${writeModifierRegex}${spaceRegex})?${propertiesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let accessorsRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${accessModifierRegex}${spaceRegex}${accessorsRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let constructorRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${constructorRegex}${spaceRegex}${countRegex}${spaceRegex}`, "i");
	let methodsRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${accessModifierRegex}${spaceRegex}(${staticModifierRegex}${spaceRegex})?(${abstractModifierRegex}${spaceRegex})?${methodsRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let propertySiganturesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}(${writeModifierRegex}${spaceRegex})?${propertiesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let indexSiganturesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}(${writeModifierRegex}${spaceRegex})?${indexesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let methodSignaturesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${methodsRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let typesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${typesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let interfacesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${interfacesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let classesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${classesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let enumsRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${enumsRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let functionsRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${functionsRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");
	let variablesRegionRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${regionRegex}${spaceRegex}${variablesRegex}${spaceRegex}${countRegex}${spaceRegex}$`, "i");

	let endregionsRegex = new RegExp(`^${spaceRegex}//${spaceRegex}${endregionRegex}${spaceRegex}$`, "i");
	let lines: string[] = sourceCode.split(newLine);
	let lines2: string[] = [];

	for (let i = 0; i < lines.length; i++)
	{
		if (!propertiesRegionRegex.test(lines[i]) &&
			!accessorsRegionRegex.test(lines[i]) &&
			!constructorRegionRegex.test(lines[i]) &&
			!methodsRegionRegex.test(lines[i]) &&
			!endregionsRegex.test(lines[i]) &&
			!propertySiganturesRegionRegex.test(lines[i]) &&
			!indexSiganturesRegionRegex.test(lines[i]) &&
			!methodSignaturesRegionRegex.test(lines[i]) &&
			!typesRegionRegex.test(lines[i]) &&
			!interfacesRegionRegex.test(lines[i]) &&
			!classesRegionRegex.test(lines[i]) &&
			!enumsRegionRegex.test(lines[i]) &&
			!functionsRegionRegex.test(lines[i]) &&
			!variablesRegionRegex.test(lines[i]))
		{
			lines2.push(lines[i]);
		}
		else
		{
			while (lines.length > i &&
				lines[i] === emptyLine)
			{
				i++;
			}

			while (lines2.length > 0 &&
				lines2[lines2.length - 1] === emptyLine)
			{
				lines2.pop();
			}
		}
	}

	return lines2.join(newLine);
}

export function formatRegions(sourceCode: string)
{
	const newLine = "\r\n";
	const newLinePlaceholder = "//newline";
	const cleanPlaceholder = "//clean";
	let newLineRegex = new RegExp(`\\s*${newLinePlaceholder}`, "g");
	let cleanRegex = new RegExp(`\\s*${cleanPlaceholder}`, "g");

	sourceCode = sourceCode.replace(newLineRegex, newLine);
	sourceCode = sourceCode.replace(cleanRegex, "");

	return sourceCode;
}

export function formatLines(sourceCode: string)
{
	const newLine = "\r\n";
	let newLineRegex = new RegExp(`^\\s*$`);
	let openingBraceRegex = new RegExp(`^.*\{\\s*$`);
	let closingBraceRegex = new RegExp(`^\\s*\}\\s*$`);

	let lines: string[] = sourceCode.split(newLine);

	for (let i = 0; i < lines.length - 1; i++)
	{
		if (openingBraceRegex.test(lines[i]) &&
			newLineRegex.test(lines[i + 1]))
		{
			// remove empty line after {
			lines.splice(i + 1, 1);

			i--;
		}
		else if (newLineRegex.test(lines[i]) &&
			closingBraceRegex.test(lines[i + 1]))
		{
			// remove empty line before }
			lines.splice(i, 1);

			i--;
		}
		else if (newLineRegex.test(lines[i]) &&
			newLineRegex.test(lines[i + 1]))
		{
			lines.splice(i, 1);

			i--;
		}
	}

	return lines.join(newLine);
}
