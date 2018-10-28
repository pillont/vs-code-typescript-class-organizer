import * as ts from "typescript";
import { AccessModifier } from "./access-modifier";
import { WriteModifier } from "./write-modifier";

export abstract class ElementNode
{
	// #region Properties (5)

	public accessModifier: AccessModifier = AccessModifier.public;
	public end: number = 0;
	public fullStart: number = 0;
	public name: string = "";
	public start: number = 0;

	// #endregion

	// #region Constructors (1)

	constructor()
	{
	}

	// #endregion

	// #region Protected Methods (4)

	protected getAccessModifier(node: ts.PropertyDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode | ts.PropertySignature | ts.IndexSignatureDeclaration)
	{
		let accessModifier: AccessModifier = AccessModifier.public;
		let accessModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PublicKeyword];
		let nodeAccessModifier: ts.Modifier | undefined;

		if (node.modifiers)
		{
			nodeAccessModifier = node.modifiers.find((x) => accessModifiers.indexOf(x.kind) > -1);

			if (nodeAccessModifier)
			{
				if (nodeAccessModifier.kind === ts.SyntaxKind.ProtectedKeyword)
				{
					accessModifier = AccessModifier.protected;
				}
				else if (nodeAccessModifier.kind === ts.SyntaxKind.PrivateKeyword)
				{
					accessModifier = AccessModifier.private;
				}
			}
		}

		return accessModifier;
	}

	protected getIsAbstract(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
	{
		let isAbstract = false;

		if (node.modifiers)
		{
			isAbstract = node.modifiers.find((x) => x.kind === ts.SyntaxKind.AbstractKeyword) !== undefined;
		}

		return isAbstract;
	}

	protected getIsExport(node: ts.ClassDeclaration | ts.FunctionDeclaration)
	{
		let isExport = false;

		if (node.modifiers)
		{
			let tmp = node.modifiers.find((modifier, index, array) => modifier.kind === ts.SyntaxKind.ExportKeyword);

			if (tmp &&
				tmp.kind === ts.SyntaxKind.ExportKeyword)
			{
				isExport = true;
			}
		}

		return isExport;
	}

	protected getIsStatic(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
	{
		let isStatic = false;

		if (node.modifiers)
		{
			isStatic = node.modifiers.find((x) => x.kind === ts.SyntaxKind.StaticKeyword) !== undefined;
		}

		return isStatic;
	}

	protected getWriteMode(node: ts.PropertyDeclaration | ts.VariableStatement | ts.IndexedAccessTypeNode | ts.PropertySignature | ts.IndexSignatureDeclaration)
	{
		let writeMode: WriteModifier = WriteModifier.Writable;
		let writeModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.ConstKeyword, ts.SyntaxKind.ReadonlyKeyword];
		let nodeWriteModifier: ts.Modifier | undefined;

		if (node.modifiers)
		{
			nodeWriteModifier = node.modifiers.find((x) => writeModifiers.indexOf(x.kind) > -1);

			if (nodeWriteModifier)
			{
				if (nodeWriteModifier.kind === ts.SyntaxKind.ConstKeyword)
				{
					writeMode = WriteModifier.Const;
				}
				else if (nodeWriteModifier.kind === ts.SyntaxKind.ReadonlyKeyword)
				{
					writeMode = WriteModifier.ReadOnly;
				}
			}
		}

		return writeMode;
	}

	// #endregion
}
